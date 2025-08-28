export default function GoogleLoginButton() {
  async function handleSignInWithGoogle(response) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: response.credential,
    });
  }

  return (
    <div>
      <div
        id="g_id_onload"
        data-client_id="classplan-470413 "
        data-context="signin"
        data-ux_mode="popup"
        data-callback="HandleLoginWithGoogle"
        data-auto_prompt="false"
        data-use_fedcm_for_prompt="true"
      ></div>

      <div
        class="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="continue_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </div>
  );
}
