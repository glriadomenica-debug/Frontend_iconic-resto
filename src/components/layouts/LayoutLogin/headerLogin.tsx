export default function HeaderLogin() {
  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-5 md:px-8 py-4">
      <div className="flex items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-center gap-3 md:gap-8 flex-1">
          {/* Logo */}
          <h1 className="text-2xl sm:text-3xl font-bold text-orange-600">
            DineFlow
          </h1>
        </div>
      </div>
    </header>
  );
}
