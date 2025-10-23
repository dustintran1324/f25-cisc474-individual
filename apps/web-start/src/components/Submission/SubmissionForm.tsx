import { useState, useEffect } from 'react';
import { COLORS } from '../../constants/theme';
import type { SubmissionCreateIn, SubmissionUpdateIn } from '@repo/api';

interface SubmissionFormProps {
  submission?: {
    id: string;
    type: 'TRADITIONAL_CODE' | 'SOLUTION_WALKTHROUGH' | 'REVERSE_PROGRAMMING';
    codeContent: string | null;
    walkthroughText: string | null;
    codeExplanation: string | null;
  };
  userId: string;
  assignmentId: string;
  isSubmitting: boolean;
  onSubmit: (data: SubmissionCreateIn | { id: string; data: SubmissionUpdateIn }) => void;
  onCancel: () => void;
}

export function SubmissionForm({
  submission,
  userId,
  assignmentId,
  isSubmitting,
  onSubmit,
  onCancel,
}: SubmissionFormProps) {
  const [formData, setFormData] = useState<{
    type: 'TRADITIONAL_CODE' | 'SOLUTION_WALKTHROUGH' | 'REVERSE_PROGRAMMING';
    content: string;
  }>({
    type: 'TRADITIONAL_CODE',
    content: '',
  });

  useEffect(() => {
    if (submission) {
      setFormData({
        type: submission.type,
        content:
          submission.codeContent ||
          submission.walkthroughText ||
          submission.codeExplanation ||
          '',
      });
    }
  }, [submission]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (submission) {
      const updateData: SubmissionUpdateIn = {
        type: formData.type,
        codeContent: formData.type === 'TRADITIONAL_CODE' ? formData.content : undefined,
        walkthroughText:
          formData.type === 'SOLUTION_WALKTHROUGH' ? formData.content : undefined,
        codeExplanation:
          formData.type === 'REVERSE_PROGRAMMING' ? formData.content : undefined,
      };
      onSubmit({ id: submission.id, data: updateData });
    } else {
      const createData: SubmissionCreateIn = {
        type: formData.type,
        userId,
        assignmentId,
        codeContent: formData.type === 'TRADITIONAL_CODE' ? formData.content : undefined,
        walkthroughText:
          formData.type === 'SOLUTION_WALKTHROUGH' ? formData.content : undefined,
        codeExplanation:
          formData.type === 'REVERSE_PROGRAMMING' ? formData.content : undefined,
      };
      onSubmit(createData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border-4 border-black rounded-lg bg-white">
      <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.primary }}>
        {submission ? 'Edit Submission' : 'Create New Submission'}
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
            Submission Type
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as typeof formData.type,
              })
            }
            className="w-full px-3 py-2 border-2 border-black rounded"
            style={{ color: COLORS.primary }}
          >
            <option value="TRADITIONAL_CODE">Traditional Code (The Scribe)</option>
            <option value="SOLUTION_WALKTHROUGH">Solution Walkthrough (The Oracle)</option>
            <option value="REVERSE_PROGRAMMING">Reverse Programming (The Sage)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
            Content
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={6}
            className="w-full px-3 py-2 border-2 border-black rounded font-mono"
            style={{ color: COLORS.primary }}
            placeholder="Enter your submission content here..."
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-black text-white rounded font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : submission ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border-2 border-black rounded font-medium hover:bg-gray-100 transition-colors"
            style={{ color: COLORS.primary }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
