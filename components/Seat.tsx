interface SeatProps {
  number: string;
  isBooked: boolean;
  isSelected: boolean;
  onSelect: (seatNumber: string) => void;
}

export default function Seat({ number, isBooked, isSelected, onSelect }: SeatProps) {
  return (
    <button
      onClick={() => !isBooked && onSelect(number)}
      disabled={isBooked}
      className={`
        w-full p-4 rounded-lg text-center transition-colors
        ${isBooked 
          ? 'bg-gray-300 cursor-not-allowed' 
          : isSelected 
            ? 'bg-blue-500 text-white' 
            : 'bg-white border border-gray-300 hover:border-blue-500 text-black'
        }
      `}
    >
      {number}
    </button>
  )
}