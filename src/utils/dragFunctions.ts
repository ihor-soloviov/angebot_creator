export const dragStartHandler = (
  e: React.DragEvent<HTMLDivElement>,
  setDrag: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  setDrag(true);
};

export const dragLeaveHandler = (
  e: React.DragEvent<HTMLDivElement>,
  setDrag: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  setDrag(false);
};
