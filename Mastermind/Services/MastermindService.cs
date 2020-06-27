using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mastermind.Models;

namespace Mastermind.Services
{
    public class MastermindService
    {
        private Dictionary<Guid, Game> Games { get; set; }

        public MastermindService()
        {
            this.Games = new Dictionary<Guid, Game>();
        }

        public Guid CreateNewGame()
        {
            var guid = Guid.NewGuid();
            Games.Add(guid, new Game());
            return guid;
        }

        public Game GetGame(Guid guid)
        {
            return Games.TryGetValue(guid, out var game) ? game : null;
        }

        public void QuitGame(Guid guid)
        {
            if (Games.ContainsKey(guid))
            {
                Games.Remove(guid);
            }
        }
    }
}