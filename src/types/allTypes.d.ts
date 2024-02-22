interface Window {
  yesNo(
    title: string,
    message: string | ReactNode,
    yes?: string,
    callback?: () => void
  );
}
declare global {
  declare function alert(message: string | ReactNode, callback?: () => void);
  declare function yesNo(
    title: string,
    message: string | ReactNode,
    yes?: string,
    callback?: () => void
  );
  declare function errorAlert(
    message: string | ReactNode,
    callback?: () => void
  );
}
