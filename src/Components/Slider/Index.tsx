import { Slider } from "primereact/slider";

interface SliderProps {
  sliderId: string;
  label?: string;
}

function SliderComponent({ sliderId, label }: SliderProps) {
  return (
    <div className="full__width slider__component__container">
      <label htmlFor={sliderId}>{label}</label>
      <Slider className="full__width" value={50} />
    </div>
  );
}

export default SliderComponent;
