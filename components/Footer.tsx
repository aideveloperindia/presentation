export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Road Safety Platform</h3>
            <p className="text-gray-400">
              A dedicated platform for Road Safety Month, educating children, youth,
              and the general public across Telangana.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-4">
              For inquiries, please contact:
            </p>
            <a
              href="https://aideveloperindia.store/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-transparent.png"
                alt="Aditya Nandagiri Logo"
                className="h-12 w-auto"
              />
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Copyright</h3>
            <p className="text-gray-400">
              © {new Date().getFullYear()} Road Safety Digital Platform. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
