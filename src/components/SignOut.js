import React from 'react';

function SignOut({ auth }) {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut().catch(error => {
      console.error("Error signing out: ", error);
    })}>
      Sign Out
    </button>
  );
}

export default SignOut;
