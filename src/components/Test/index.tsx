import ProtectedRoute from '../ProtectedRoute';

function Test() {
  return (
    <ProtectedRoute>
      {/* // Button open Firtst Modal */}
      <a
        type="button"
        className="btn btn-primary"
        href={`
          https://api.netatmo.com/oauth2/authorize?
            client_id=6435230837bb19c2b50dd6ce
            &redirect_uri=[YOUR_REDIRECT_URI]
            &scope=[SCOPE_SPACE_SEPARATED]
            &state=[SOME_ARBITRARY_BUT_UNIQUE_STRING]`}
      >
        Open first modal
      </a>

    </ProtectedRoute>
  );
}

export default Test;
