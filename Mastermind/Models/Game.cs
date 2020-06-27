using System;
using System.Collections.Generic;

namespace Mastermind.Models
{
    public class Game
    {
        public Row MasterRow { get; }

        public List<Row> PlayedRows {get; }

        public bool IsWon { get; private set; }

        private readonly Random random; 

        public Game()
        {
            random = new Random();
            MasterRow = new Row(RandomColour(), RandomColour(), RandomColour(), RandomColour());
            PlayedRows = new List<Row>(10);
            IsWon = false;
        }

        public Score PlayRow(Row newRow)
        {
            if (IsWon) throw new Exception("Game Finished");
            if (PlayedRows.Count >= 10) throw new Exception("Game Finished");

            PlayedRows.Add(newRow);
            var score = MasterRow.CompareToOtherRow(newRow);
            if (score.Same == 4)
            {
                IsWon = true;
            }
            return score;
        }

        private Colour RandomColour()
        {
            var maxColour = Enum.GetNames(typeof(Colour)).Length;
            return (Colour)random.Next(0, maxColour);
        }
    }
}