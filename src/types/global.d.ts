declare global {
  interface Window {
    ym?: (id: number, method: string, goal: string, params?: any) => void;
    sendFormSuccessGoal?: (formType: string) => void;
    sendThanksPageGoal?: () => void;
  }
}

export {}; 