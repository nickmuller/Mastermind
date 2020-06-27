namespace Mastermind.Models
{
    public class Pin
    {
        public Colour Colour { get; }
        public int Position { get; }

        public Pin(Colour colour, int position)
        {
            Colour = colour;
            Position = position;
        }

        public bool SameColour(Pin other)
        {
            return other.Colour == Colour;
        }

        public bool Same(Pin other)
        {
            return other.Colour == Colour
                && other.Position == Position;
        }
    }
}