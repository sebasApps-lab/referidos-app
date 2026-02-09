import React from "react";
import { logError, reportError } from "../../services/loggingClient";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logError(error, {
      source: "react_error_boundary_log_only",
      component_stack: info?.componentStack || null,
    });
    void reportError(error, {
      code: "unknown_error",
      context: {
        source: "react_error_boundary",
        component_stack: info?.componentStack || null,
      },
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#F8F6FF] px-6">
          <div className="w-full max-w-lg rounded-3xl border border-[#E7E1FF] bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-bold text-[#2F1A55]">
              Ocurrio un error inesperado
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Puedes recargar la aplicacion para continuar.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="mt-6 rounded-xl bg-[#5E30A5] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Recargar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;
