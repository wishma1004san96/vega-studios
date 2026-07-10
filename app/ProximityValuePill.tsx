type ProximityValuePillProps = {
  label: string;
};

export default function ProximityValuePill({ label }: ProximityValuePillProps) {
  return (
    <button type="button" className="core-value-pill">
      {label}
    </button>
  );
}
