// src/components/ui/CheckboxPill.tsx
interface CheckboxPillProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxPill = ({ id, label, checked, onChange }: CheckboxPillProps) => (
  <div>
    <input
      type="checkbox"
      id={id}
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