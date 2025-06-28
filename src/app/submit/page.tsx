export const metadata = {
  title: 'Submit Tool - ToolAIze',
  description: 'Submit your AI tool to ToolAIze and help others discover great AI solutions.'
};

export default function SubmitToolPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Submit a New AI Tool</h1>
      <p className="mb-4">Do you know an AI tool that should be listed on ToolAIze? Fill out the form below to submit your tool for review. We welcome submissions from developers, companies, and users alike.</p>
      <form className="bg-white rounded-lg shadow p-6 flex flex-col gap-4" style={{maxWidth: 600}}>
        <label className="font-semibold">Tool Name
          <input type="text" className="block w-full border border-gray-300 rounded px-3 py-2 mt-1" placeholder="e.g. ChatGPT" required />
        </label>
        <label className="font-semibold">Website URL
          <input type="url" className="block w-full border border-gray-300 rounded px-3 py-2 mt-1" placeholder="https://..." required />
        </label>
        <label className="font-semibold">Category
          <input type="text" className="block w-full border border-gray-300 rounded px-3 py-2 mt-1" placeholder="e.g. Writing, Image Generation" required />
        </label>
        <label className="font-semibold">Description
          <textarea className="block w-full border border-gray-300 rounded px-3 py-2 mt-1" rows={3} placeholder="Briefly describe the tool..." required />
        </label>
        <button type="submit" className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700">Submit Tool</button>
      </form>
      <p className="text-sm text-gray-500 mt-4">All submissions are reviewed before being published. We may contact you for more information.</p>
    </main>
  );
}
