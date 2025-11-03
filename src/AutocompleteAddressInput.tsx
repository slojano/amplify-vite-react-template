import * as React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function AutocompleteAddressInput({ value, onChange, placeholder }: Props) {
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const serviceRef = React.useRef<google.maps.places.AutocompleteService | null>(null);

  React.useEffect(() => {
    if (!window.google || !window.google.maps?.places) return;
    serviceRef.current = new google.maps.places.AutocompleteService();
  }, []);

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onChange(input);

    if (!input || !serviceRef.current) {
      setSuggestions([]);
      return;
    }

    serviceRef.current.getPlacePredictions({ input }, (predictions) => {
      setSuggestions(predictions?.map((p) => p.description) || []);
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={value}
        onChange={handleInput}
        placeholder={placeholder || "Enter address"}
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            background: "white",
            border: "1px solid #ddd",
            width: "100%",
            listStyle: "none",
            margin: 0,
            padding: 0,
            zIndex: 10,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => {
                onChange(s);
                setSuggestions([]);
              }}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
