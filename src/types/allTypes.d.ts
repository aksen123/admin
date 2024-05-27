interface Window {
  alert(message: string, callback?: () => void);
  yesNo(
    title: string,
    message: string | ReactNode,
    yes?: string,
    callback?: () => void
  );
}
declare global {
  declare function alert(message: string, callback?: () => void);
  declare function yesNo(
    title: string,
    message: string | ReactNode,
    yes?: string,
    callback?: () => void
  );
}
