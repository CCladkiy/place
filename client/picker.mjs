const setAttributes = (element, object) => {
  for (const [key, value] of Object.entries(object)) {
    element.setAttribute(key, value);
  }
};

const fetchColorsFromServer = async () => {
  const response = await fetch('/api/colors'); // Предположим, что сервер предоставляет цвета по этому URL
  if (!response.ok) {
    throw new Error('Failed to fetch colors');
  }
  return response.json();
};

const drawPalette = async () => {
  try {
    const colors = await fetchColorsFromServer();
    pickedColor = colors[0];
    const palette = document.querySelector("#palette");
    const fragment = document.createDocumentFragment();
    for (const color of colors) {
      const label = document.createElement("label");
      label.setAttribute("class", "palette__color");
      const input = document.createElement("input");
      setAttributes(input, {
        class: "palette__checkbox",
        type: "radio",
        name: "color",
        value: color
      });
      if (color === pickedColor) {
        input.setAttribute("checked", "");
      }
      input.addEventListener("input", e => {
        pickedColor = e.target.value;
      });
      const span = document.createElement("span");
      setAttributes(span, {
        class: "palette__name",
        style: `background-color: ${color}`
      });
      label.appendChild(input);
      label.appendChild(span);
      fragment.appendChild(label);
    }
    palette.appendChild(fragment);
  } catch (error) {
    console.error('Error drawing palette:', error);
  }
};

let pickedColor = null;

drawPalette().catch(console.error);

const picker = {
  get color() {
    return pickedColor;
  }
};

export default picker;