using Mastermind.Models;
using Mastermind.Services;
using NUnit.Framework;

namespace MastermindTest.Tests
{
    public class ServiceTest
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void TestCircleOfLife()
        {
            var service = new MastermindService();
            var guid = service.CreateNewGame();
            var game = service.GetGame(guid);
            var game2 = service.GetGame(guid);
            Assert.AreEqual(game, game2);

            service.QuitGame(guid);
            var game3 = service.GetGame(guid);
            Assert.IsNull(game3);
        }
    }
}