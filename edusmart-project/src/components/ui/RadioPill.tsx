// src/components/ui/RadioPill.tsx
interface RadioPillProps {
  id: string;
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioPill = ({ id, label, name, value, checked, onChange }: RadioPillProps) => (
  <div>
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden filter-pill-input"
    />
    <label
      htmlFor={id}
      className="filter-pill" // Dùng class CSS (xem ở Bước 6)
    >
      {label}
    </label>
  </div>
);