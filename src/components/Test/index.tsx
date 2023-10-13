function Test() {
  return (
    <>
      {/* // Button open Firtst Modal */}
      <button
        type="button"
        className="btn btn-primary"
        href={
          `
          https://api.netatmo.com/oauth2/authorize?
            client_id=6435230837bb19c2b50dd6ce
            &redirect_uri=[YOUR_REDIRECT_URI]
            &scope=[SCOPE_SPACE_SEPARATED]
            &state=[SOME_ARBITRARY_BUT_UNIQUE_STRING]`
        }
      >
        Open first modal

      </button>

    </>
  );
}

export default Test;
