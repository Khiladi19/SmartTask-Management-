import { useSelector } from 'react-redux';

function Profile() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="text-center text-red-500 mt-10">
        You must be logged in to view this page.
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  };

  const capitalize = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-blue-300">
        {/* Profile Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
            {getInitials(user.name)}
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome, {capitalize(user.name)}!
        </h2>

        <div className="space-y-4">
          <ProfileField label="Full Name" value={capitalize(user.name)} />
          <ProfileField label="Email Address" value={user.email} />
          <ProfileField label="Role" value={capitalize(user.role)} />
        </div>
      </div>
    </div>
  );
}

// Reusable Field Component
function ProfileField({ label, value }) {
  return (
    <div>
      <label className="block text-sm text-gray-500 font-medium">{label}</label>
      <div className="mt-1 p-3 bg-gray-100 text-gray-800 rounded-lg shadow-inner text-sm">
        {value || 'N/A'}
      </div>
    </div>
  );
}

export default Profile;


