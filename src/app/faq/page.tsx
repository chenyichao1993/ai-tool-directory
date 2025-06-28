export const metadata = {
  title: 'FAQ - ToolAIze',
  description: 'Frequently asked questions about ToolAIze and using AI tools.'
};

export default function FAQPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">What is Toolaize?</h2>
        <p>Toolaize is a curated directory of the best AI tools available for various tasks, helping users discover, compare, and utilize AI solutions efficiently.</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">How do I submit a new AI tool?</h2>
        <p>You can submit a new tool by visiting the <a href="/submit" className="text-indigo-600 hover:underline">Submit Tool</a> page and filling out the required information.</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Is ToolAIze free to use?</h2>
        <p>Yes, ToolAIze is completely free for users to browse and discover AI tools.</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">How often is the directory updated?</h2>
        <p>We regularly update our listings to ensure you have access to the latest and most relevant AI tools.</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">How can I contact support?</h2>
        <p>If you need assistance, please visit our <a href="/contact" className="text-indigo-600 hover:underline">Contact Us</a> page.</p>
      </div>
    </main>
  );
} 