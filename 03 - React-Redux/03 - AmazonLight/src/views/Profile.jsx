import React from 'react';

function Profile() {
  return (
    <div>
      <h2>Hi John!</h2>
      <h3>Customize your profile here</h3>

      <form>
        <p>
          Your firstname : <input type="text" placeholder="John" />
        </p>
        <p>
          Your lastname : <input type="text" placeholder="Doe" />
        </p>
        <p>
          Your email: <input type="email" placeholder="john.doa@email.com" />
        </p>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Profile;
