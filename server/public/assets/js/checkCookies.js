value_or_null = (document.cookie.match(
  /^(?:.*;)?\s*showAllButtons\s*=\s*([^;]+)(?:.*)?$/
) || [, null])[1];

console.log(value_or_null);

if (!value_or_null) {
  const adminElems = document
    .querySelectorAll(".adminbutton")
    .forEach((button) => {
      button.style.display = "none";
    });
}
