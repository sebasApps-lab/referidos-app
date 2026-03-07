import React from "react";
import AuthView from "./AuthView";
import AuthBranderHeader from "./blocks/AuthBranderHeader";
import AuthFooter from "./blocks/AuthFooter";
import WelcomeStep from "./steps/WelcomeStep";

function noop() {}

export default function AuthFlow() {
  return (
    <AuthView
      className="justify-center pb-28"
      header={<AuthBranderHeader className="mb-6" />}
      footer={<AuthFooter />}
    >
      <WelcomeStep
        enableApple={false}
        onEmail={noop}
        onGoogle={noop}
        onFacebook={noop}
        onApple={noop}
        onTwitter={noop}
        onDiscord={noop}
      />
    </AuthView>
  );
}
