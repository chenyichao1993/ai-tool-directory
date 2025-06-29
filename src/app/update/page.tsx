import Breadcrumbs from "../Breadcrumbs";

export const metadata = {
  title: 'Update Tool - ToolAIze',
  description: 'Request an update to an existing AI tool listing on ToolAIze.'
};

export default function UpdateToolPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            input[type="url"], textarea, button.submit-btn {
              width: 100% !important;
              max-width: 100% !important;
              border-radius: 22px !important;
              box-sizing: border-box !important;
              display: block !important;
            }
            button.submit-btn {
              background: #4f46e5 !important;
              color: #fff !important;
              font-weight: 600 !important;
              font-size: 1.1rem !important;
              padding: 0.75rem 0 !important;
              margin-top: 8px !important;
              border: none !important;
              transition: background 0.2s;
            }
            button.submit-btn:hover {
              background: #3730a3 !important;
            }
          `
        }}
      />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 pt-4 pb-12">
          <Breadcrumbs />
          <h1 className="text-3xl font-bold mb-4">Update an Existing Tool</h1>
          <p className="mb-4">If you notice outdated or incorrect information about an AI tool listed on ToolAIze, please use the form below to request an update. Your feedback helps us keep our directory accurate and useful.</p>
          <div className="flex flex-col gap-4" style={{maxWidth: 600}}>
            <label className="font-semibold block">Tool Name
              <input type="text" className="block w-full border border-gray-300 px-3 py-2 mt-1" style={{width: '100%', borderRadius: '16px'}} placeholder="e.g. ChatGPT" required />
            </label>
            <label className="font-semibold block">Website URL
              <input type="url" className="block w-full border border-gray-300 px-3 py-2 mt-1" style={{width: '100%', borderRadius: '16px'}} placeholder="https://..." required />
            </label>
            <label className="font-semibold block">Update Details
              <textarea
                className="block border border-gray-300 px-3 py-2 mt-1"
                style={{
                  width: '100%',
                  minWidth: 0,
                  maxWidth: '100%',
                  borderRadius: '22px',
                  boxSizing: 'border-box',
                  display: 'block'
                }}
                rows={3}
                placeholder="Describe the update needed..."
                required
              />
            </label>
            <button className="submit-btn">Submit Update</button>
          </div>
          <p className="text-sm text-gray-500 mt-4">All update requests are reviewed before changes are made. We may contact you for clarification.</p>
        </div>
      </main>
    </>
  );
} 