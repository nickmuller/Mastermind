using System;
using Mastermind.Models;
using NuGet.Frameworks;
using NUnit.Framework;

namespace MastermindTest.Tests
{
    public class GameTest
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void TestTheWinnerTakesAll()
        {
            var game = new Game();
            var masterrow = game.MasterRow;
            game.PlayRow(masterrow);
            Assert.IsTrue(game.IsWon);
        }
    }
}