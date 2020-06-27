using System;
using System.Collections.Generic;
using Mastermind.Models;
using Mastermind.Services;
using Microsoft.AspNetCore.Mvc;

namespace Mastermind.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MastermindController : ControllerBase
    {
        private readonly MastermindService service;
        public MastermindController(MastermindService service)
        {
            this.service = service;
        }

        [HttpPost("StartNewGame")]
        public ActionResult<Guid> StartNewGame()
        {
            return service.CreateNewGame();
        }

        [HttpPost("QuitGame")]
        public void QuitGame(Guid guid)
        {
            service.QuitGame(guid);
        }

        [HttpPost("NextTry")]
        public Score NextTry(Guid guid, Colour[] colours)
        {
            if (colours.Length != 4)
            {
                throw new Exception("row must have 4 pins");
            }
            var row = new Row(colours[0], colours[1], colours[2], colours[3]);
            var game = service.GetGame(guid);
            if (game != null)
            {
                return game.PlayRow(row);
            }
            throw new Exception("guid doesn't exist");
        }

        [HttpGet("Status")]
        public (bool, int) Status(Guid guid)
        {
            var game = service.GetGame(guid);
            if (game != null)
            {
                return (game.IsWon, game.PlayedRows.Count);
            }
            throw new Exception("guid doesn't exist");
        }

        [HttpGet("AllPlayedRows")]
        public List<Row> AllPlayedRows(Guid guid)
        {
            var game = service.GetGame(guid);
            if (game != null)
            {
                return game.PlayedRows;
            }
            throw new Exception("guid doesn't exist");
        }

        [HttpGet("MasterRow")]
        public Row MasterRow(Guid guid)
        {
            var game = service.GetGame(guid);
            if (game != null)
            {
                return game.MasterRow;
            }
            throw new Exception("guid doesn't exist");
        }
    }
}