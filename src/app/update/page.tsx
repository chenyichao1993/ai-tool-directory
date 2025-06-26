export const metadata = {
  title: 'Update Tool - ToolAIze',
  description: 'Request an update to an existing AI tool listing on ToolAIze.'
};

export default function UpdateToolPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Update an Existing Tool</h1>
      <p className="mb-4">If you notice outdated or incorrect information about an AI tool listed on ToolAIze, please use the form below to request an update. Your feedback helps us keep our directory accurate and useful.</p>
      <form className="bg-white rounded-lg shadow p-6 flex flex-col gap-4" style={{maxWidth: 600}}>
        <label className="font-semibold">Tool Name
          <input type="text" className="block w-full border border-gray-300 rounded px-3 py-2 mt-1" placeholder="e.g. ChatGPT" required />
        </label>
        <label className="font-semibold">Website URL
          <input type="url" className="block w-full border border-gray-300 rounded px-3 py-2 mt-1" placeholder="https://..." required />
        </label>
        <label className="font-semibold">Update Details
          <textarea className="block w-full border border-gray-300 rounded px-3 py-2 mt-1" rows={3} placeholder="Describe the update needed..." required />
        </label>
        <button type="submit" className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700">Submit Update</button>
      </form>
      <p className="text-sm text-gray-500 mt-4">All update requests are reviewed before changes are made. We may contact you for clarification.</p>
    </main>
  );
} 