using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Mastermind.Models
{
    public class Row
    {
        [MinLength(4)]
        [MaxLength(4)]
        public Pin[] Pins { get; }

        public Row(Colour c1, Colour c2, Colour c3, Colour c4)
        {
            Pins = new[]
            {
                new Pin(c1, 1),
                new Pin(c2, 2),
                new Pin(c3, 3),
                new Pin(c4, 4)
            };
        }

        public Score CompareToOtherRow(Row otherRow)
        {
            var otherpins = otherRow.Pins.ToList();
            var mypins = Pins.ToList();
            var sameScore = 0;
            var sameColourScore = 0;

            foreach (var other in otherRow.Pins)
            {
                foreach (var mine in Pins)
                {
                    if (!mine.Same(other)) continue;
                    otherpins.Remove(other);
                    mypins.Remove(mine);
                    sameScore++;
                }
            }
            foreach (var other in otherpins)
            {
                var pin = mypins.FirstOrDefault(p => p.SameColour(other));
                if (pin == null) continue;
                mypins.Remove(pin);
                sameColourScore++;
            }

            return new Score(sameScore, sameColourScore);
        }
    }
}