export default function getGridClass(index) {
  switch (index) {
    case 0:
      return "row-span-2";
    case 1:
      return "col-start-2 row-start-1";
    case 2:
      return "col-span-2 col-start-1 row-start-3";
    case 3:
      return "row-span-2 row-start-4";
    case 4:
      return "row-start-4";
    case 5:
      return "col-start-2 row-start-5";
    default:
      return "";
  }
}
