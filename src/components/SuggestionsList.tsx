interface SuggestionsListProps {
  suggestions: string[];
  fallbackMessage?: string;
  onSuggestionClicked?: (suggestion: string) => void;
}

const SuggestionsList = ({
  suggestions,
  fallbackMessage = '',
  onSuggestionClicked,
}: SuggestionsListProps) => {
  const handleClick = (suggestion: string) => {
    return () => onSuggestionClicked && onSuggestionClicked(suggestion);
  };

  return (
    <div className="u-py-2 u-px-8 u-absolute u-top-full u-left-4 u-right-0 u-bg-zinc-950/70 u-rounded-b-xl">
      {suggestions.length
        ? suggestions.map((suggestion) => (
            <div
              className="u-cursor-pointer"
              key={suggestion}
              onClick={handleClick(suggestion)}
            >
              {suggestion}
            </div>
          ))
        : fallbackMessage}
    </div>
  );
};

export default SuggestionsList;
