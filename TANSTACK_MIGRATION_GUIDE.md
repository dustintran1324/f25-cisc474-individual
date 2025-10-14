# TanStack Start Migration Guide

This guide documents the complete migration from Next.js/Vercel to TanStack Start/Cloudflare Workers for the CISC474 Individual Project.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Migration Steps](#migration-steps)
4. [File Structure Reference](#file-structure-reference)
5. [Code Templates](#code-templates)
6. [Testing & Deployment](#testing--deployment)
7. [Troubleshooting](#troubleshooting)

---

## Overview

### What's Changing

**Frontend:**
- Next.js → TanStack Start
- Vercel → Cloudflare Workers
- App Router → File-based TanStack Router
- React v18 → React v19
- Tailwind CSS v3 → Tailwind CSS v4

**Backend:**
- Simplified to example structure (Links module only)
- All course/assignment modules removed (to be rebuilt)
- Prisma schema simplified

**Project Structure:**
- New `apps/web-start/` directory (primary frontend)
- Old `apps/web/` deprecated (scripts renamed to `*:legacy`)
- Old `apps/docs/` deprecated

---

## Prerequisites

1. Git configured with upstream remote
2. Node.js >=18
3. npm@10.9.0 or higher
4. All pending work committed or stashed

---

## Migration Steps

### Step 1: Create New Branch

```bash
# Make sure you're on main and up to date
git checkout main
git pull origin main

# Create fresh migration branch
git checkout -b tanstack-migration
```

### Step 2: Add Upstream and Fetch Changes

```bash
# Add professor's repo as upstream (if not already added)
git remote add upstream https://github.com/UD-CISC474-F25/individual-project-starter.git

# Fetch upstream changes
git fetch upstream

# View what files will change
git diff --name-status HEAD upstream/main
```

### Step 3: Merge Upstream Changes

```bash
# Merge upstream/main into your branch
git merge upstream/main

# If conflicts occur, resolve them carefully
# Focus on preserving your custom backend logic
```

### Step 4: Install Dependencies

```bash
# Install root dependencies
npm install

# Install web-start dependencies
cd apps/web-start
npm install

# Install shared API package dependencies
cd ../../packages/api
npm install

# Return to root
cd ../..
```

### Step 5: Configure Environment Variables

Create `apps/web-start/.env`:

```env
VITE_BACKEND_URL="http://localhost:3000"
```

Ensure `apps/api/.env` has:

```env
DATABASE_URL="your_postgres_connection_string"
DIRECT_URL="your_direct_postgres_connection_string"
PORT=3000
HOST=localhost
```

### Step 6: Generate Route Tree

```bash
# Run dev server once to generate routeTree.gen.ts
cd apps/web-start
npm run dev

# Stop after file is generated (Ctrl+C)
```

### Step 7: Test Backend

```bash
# In one terminal, run the backend
cd apps/api
npm run dev

# In another terminal, test the API
curl http://localhost:3000/links
```

Expected response: Array of link objects

### Step 8: Test Frontend

```bash
# Run the frontend dev server
cd apps/web-start
npm run dev

# Open browser to http://localhost:3001
```

You should see the TanStack Start application running.

### Step 9: Install Browser Devtools

Install TanStack Query Devtools extension:
- Chrome: [Chrome Web Store](https://chrome.google.com/webstore)
- Firefox: [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/)

Visit: https://tanstack.com/query/latest/docs/framework/react/devtools

### Step 10: Migrate Your Features

Now you need to port your existing features from `apps/web` to `apps/web-start`.

**Key considerations:**
- Convert Next.js pages to TanStack routes
- Replace fetch calls with `backendFetcher`
- Use TanStack Query for data fetching
- Update imports and paths

---

## File Structure Reference

### New Frontend Structure (apps/web-start/)

```
apps/web-start/
├── .env                        # Environment variables
├── .gitignore
├── eslint.config.js
├── package.json
├── tsconfig.json
├── vite.config.ts             # Vite configuration
├── wrangler.jsonc             # Cloudflare Workers config
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── integrations/
    │   ├── devtools.tsx       # Query devtools config
    │   ├── fetcher.ts         # API fetcher utility
    │   └── root-provider.tsx  # Query client provider
    ├── routes/
    │   ├── __root.tsx         # Root layout
    │   └── index.tsx          # Home page (/)
    ├── routeTree.gen.ts       # Auto-generated, don't edit
    ├── router.tsx             # Router configuration
    └── styles.css             # Global styles
```

### Backend Structure (apps/api/)

```
apps/api/
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts          # Imports only LinksModule
│   ├── app.service.ts
│   ├── main.ts
│   ├── prisma.service.ts
│   └── links/                 # Example module
│       ├── links.controller.ts
│       ├── links.module.ts
│       └── links.service.ts
└── package.json
```

### Shared Packages

```
packages/
├── api/                       # Shared DTOs and entities
│   ├── src/
│   │   ├── index.ts
│   │   └── links/
│   │       ├── dto/
│   │       │   ├── create-link.dto.ts
│   │       │   └── update-link.dto.ts
│   │       └── entities/
│   │           └── link.entity.ts
│   ├── package.json
│   └── tsconfig.types.json
├── database/                  # Prisma schema & client
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       └── client.ts
└── typescript-config/
    ├── base.json
    └── tanstack.json          # New: TanStack-specific config
```

---

## Code Templates

### 1. Creating a New Route

**File:** `apps/web-start/src/routes/your-route.tsx`

```typescript
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/your-route')({
  component: YourRouteComponent,
});

function YourRouteComponent() {
  return (
    <div>
      <h1>Your Route</h1>
      {/* Your component code */}
    </div>
  );
}
```

### 2. Fetching Data with TanStack Query

```typescript
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { backendFetcher } from '@/integrations/fetcher';

// Define your type (or import from @repo/api)
interface Link {
  id: number;
  title: string;
  url: string;
  description: string;
}

export const Route = createFileRoute('/links')({
  component: LinksComponent,
});

function LinksComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['links'],
    queryFn: backendFetcher<Link[]>('/links'),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Links</h1>
      <ul>
        {data?.map((link) => (
          <li key={link.id}>
            <a href={link.url}>{link.title}</a>
            <p>{link.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 3. Dynamic Routes

**File:** `apps/web-start/src/routes/links/$linkId.tsx`

```typescript
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { backendFetcher } from '@/integrations/fetcher';

interface Link {
  id: number;
  title: string;
  url: string;
  description: string;
}

export const Route = createFileRoute('/links/$linkId')({
  component: LinkDetailComponent,
});

function LinkDetailComponent() {
  const { linkId } = Route.useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['links', linkId],
    queryFn: backendFetcher<Link>(`/links/${linkId}`),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      <a href={data?.url}>Visit Link</a>
    </div>
  );
}
```

### 4. Creating a Backend Module (Example: Courses)

**Step 1:** Create module files in `apps/api/src/courses/`

**courses.controller.ts:**
```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from '@repo/api/courses/dto/create-course.dto';
import { UpdateCourseDto } from '@repo/api/courses/dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
```

**courses.service.ts:**
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCourseDto } from '@repo/api/courses/dto/create-course.dto';
import { UpdateCourseDto } from '@repo/api/courses/dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: createCourseDto,
    });
  }

  findAll() {
    return this.prisma.course.findMany();
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  remove(id: number) {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}
```

**courses.module.ts:**
```typescript
import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, PrismaService],
  exports: [CoursesService],
})
export class CoursesModule {}
```

**Step 2:** Add to `app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { CoursesModule } from './courses/courses.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [LinksModule, CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

**Step 3:** Create shared DTOs in `packages/api/src/courses/`

**dto/create-course.dto.ts:**
```typescript
export class CreateCourseDto {
  name: string;
  code: string;
  description?: string;
}
```

**dto/update-course.dto.ts:**
```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
```

**Step 4:** Export from `packages/api/src/index.ts`:

```typescript
import { Link } from './links/entities/link.entity';
import { CreateLinkDto } from './links/dto/create-link.dto';
import { UpdateLinkDto } from './links/dto/update-link.dto';
import { CreateCourseDto } from './courses/dto/create-course.dto';
import { UpdateCourseDto } from './courses/dto/update-course.dto';

export const links = {
  dto: {
    CreateLinkDto,
    UpdateLinkDto,
  },
  entities: {
    Link,
  },
};

export const courses = {
  dto: {
    CreateCourseDto,
    UpdateCourseDto,
  },
};
```

### 5. Adding Navigation

Update `apps/web-start/src/routes/__root.tsx`:

```typescript
import { Link, Outlet } from '@tanstack/react-router';

// ... existing imports and Route definition

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>
            Home
          </Link>
          <Link to="/courses" style={{ marginRight: '1rem' }}>
            Courses
          </Link>
          <Link to="/links" style={{ marginRight: '1rem' }}>
            Links
          </Link>
        </nav>
        <main style={{ padding: '1rem' }}>
          {children}
        </main>
        {/* Devtools */}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
```

---

## Testing & Deployment

### Local Testing

```bash
# Terminal 1: Run backend
cd apps/api
npm run dev

# Terminal 2: Run frontend
cd apps/web-start
npm run dev

# Test in browser
open http://localhost:3001
```

### Building for Production

```bash
# Build backend
cd apps/api
npm run build

# Build frontend
cd apps/web-start
npm run build
```

### Deploying Backend (Render)

1. Ensure your Render deployment is configured
2. Push changes to GitHub
3. Render will auto-deploy
4. Update environment variables if needed

### Deploying Frontend (Cloudflare Workers)

**First-time setup:**

1. Go to https://workers.cloudflare.com/
2. Sign up with GitHub
3. Click "Get Started" → "Import a Repository"
4. Authorize and select your repo
5. Configure:
   - **Framework preset:** None
   - **Build command:** `npx wrangler deploy -c apps/web-start/dist/server/wrangler.json`
   - **Root directory:** (leave empty)
6. Add **Build Variables** (not runtime):
   - `VITE_BACKEND_URL`: Your Render backend URL

**Subsequent deployments:**
- Push to GitHub
- Cloudflare auto-deploys

**Update CORS on backend:**

Make sure your backend allows the Cloudflare Workers origin in CORS settings.

---

## Troubleshooting

### Issue: routeTree.gen.ts not found

**Solution:**
```bash
cd apps/web-start
npm run dev
# Let it generate the file, then stop (Ctrl+C)
```

### Issue: Backend connection refused

**Checklist:**
- Is backend running on port 3000?
- Is `VITE_BACKEND_URL` set correctly in `.env`?
- Check CORS configuration if calling from frontend

### Issue: Module resolution errors

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Rebuild packages
cd packages/api
npm run build

cd ../database
npm run db:generate
```

### Issue: Tailwind styles not working

**Solution:**
Make sure `apps/web-start/src/styles.css` has:
```css
@import "tailwindcss";
```

And it's imported in `__root.tsx`:
```typescript
import appCss from '../styles.css?url';

// In head links:
links: [
  {
    rel: 'stylesheet',
    href: appCss,
  },
],
```

### Issue: Types not found from @repo/api

**Solution:**
```bash
cd packages/api
npm run build
```

### Issue: Prisma client out of sync

**Solution:**
```bash
cd packages/database
npm run db:generate
```

### Issue: Build fails on Cloudflare

**Checklist:**
- Ensure build command is exactly: `npx wrangler deploy -c apps/web-start/dist/server/wrangler.json`
- Verify `VITE_BACKEND_URL` is in Build Variables (not just runtime)
- Check `wrangler.jsonc` configuration
- Clear cache and redeploy

---

## Key Differences: Next.js vs TanStack

### Routing

**Next.js (Old):**
```typescript
// app/courses/page.tsx
export default function CoursesPage() {
  return <div>Courses</div>;
}
```

**TanStack (New):**
```typescript
// src/routes/courses/index.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/courses/')({
  component: CoursesPage,
});

function CoursesPage() {
  return <div>Courses</div>;
}
```

### Data Fetching

**Next.js (Old):**
```typescript
'use client';
import { useState, useEffect } from 'react';

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{/* render data */}</div>;
}
```

**TanStack (New):**
```typescript
import { useQuery } from '@tanstack/react-query';
import { backendFetcher } from '@/integrations/fetcher';

function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: backendFetcher('/courses'),
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{/* render data */}</div>;
}
```

### Layouts

**Next.js (Old):**
```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

**TanStack (New):**
```typescript
// src/routes/__root.tsx
import { Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return <Outlet />; // Children rendered here
}
```

---

## Next Steps After Migration

1. **Port Your Features:** Migrate your existing course/assignment features to the new structure
2. **Rebuild Backend Modules:** Add back courses, assignments, submissions modules
3. **Update Database Schema:** Add back tables you need in Prisma schema
4. **Migrate Seed Data:** Update `packages/database/src/seed.ts`
5. **Test Everything:** Ensure all features work in new architecture
6. **Deploy:** Push to production on Cloudflare and Render

---

## Resources

- [TanStack Start Docs](https://tanstack.com/start/latest)
- [TanStack Router Docs](https://tanstack.com/router/latest)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Vite Docs](https://vite.dev/)

---

## Questions?

If you encounter issues not covered here:

1. Check the upstream repo: https://github.com/UD-CISC474-F25/individual-project-starter
2. Compare your code with the upstream `main` branch
3. Check TanStack documentation
4. Ask your professor or TA

---

**Good luck with the migration!**
