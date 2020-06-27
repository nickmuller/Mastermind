namespace Mastermind.Models
{
    public class Score
    {
        public Score(int same, int sameColour)
        {
            Same = same;
            SameColour = sameColour;
        }

        public int Same { get; }
        public int SameColour { get; }
    }
}
