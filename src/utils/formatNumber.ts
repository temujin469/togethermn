export default function(num: number) {
  if (num !== undefined) {
    return parseFloat(num.toString())
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
  }
}
