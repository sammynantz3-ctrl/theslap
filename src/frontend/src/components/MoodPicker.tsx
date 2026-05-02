interface Mood {
  emoji: string;
  label: string;
  value: string;
}

export const MOODS: Mood[] = [
  { emoji: "😄", label: "Happy", value: "😄" },
  { emoji: "🤩", label: "Excited", value: "🤩" },
  { emoji: "😒", label: "Bored", value: "😒" },
  { emoji: "😱", label: "Dramatic", value: "😱" },
  { emoji: "😍", label: "In Love", value: "😍" },
  { emoji: "🎨", label: "Creative", value: "🎨" },
];

interface MoodPickerProps {
  selected: string | null;
  onSelect: (mood: string | null) => void;
}

export function MoodPicker({ selected, onSelect }: MoodPickerProps) {
  return (
    <div
      className="flex items-center gap-1.5 flex-wrap"
      data-ocid="slap_composer.mood_picker"
    >
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide mr-1">
        Mood:
      </span>
      {MOODS.map((mood) => (
        <button
          key={mood.value}
          type="button"
          title={mood.label}
          data-ocid={`slap_composer.mood.${mood.label.toLowerCase().replace(/ /g, "_")}`}
          onClick={() => onSelect(selected === mood.value ? null : mood.value)}
          className={[
            "w-8 h-8 rounded-lg text-lg flex items-center justify-center transition-smooth border-2",
            selected === mood.value
              ? "border-primary bg-primary/15 scale-110"
              : "border-transparent bg-muted hover:border-primary/40 hover:bg-primary/10",
          ].join(" ")}
          aria-pressed={selected === mood.value}
          aria-label={mood.label}
        >
          {mood.emoji}
        </button>
      ))}
    </div>
  );
}
