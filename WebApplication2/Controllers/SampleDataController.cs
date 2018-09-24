using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {

        [HttpPost("[action]")]
        public JsonResult ConvertString([FromForm] string translate)
        {
            const string vowels = "AEIOUaeiou";
            List<string> translation = new List<string>();

            foreach (string word in translate.Split(" "))
            {
                string first = word.Substring(0, 1);
                string all = word.Substring(1, word.Length - 1);
                int isVowel = vowels.IndexOf(first);

                if (isVowel == -1)
                    translation.Add(all + first + "ay");
                else
                    translation.Add(word + "way");
            }

            return Json(string.Join(" ", translation));
        }
    }
}
