using System;

class Program
{
    static void RectangleMenu()
    {
        Console.Write("Enter the length of the rectangle: ");
        double length = double.Parse(Console.ReadLine()!);
        Console.Write("Enter the width of the rectangle: ");
        double width = double.Parse(Console.ReadLine()!);
        if (length < 2 || width < 2)
        {
            Console.WriteLine("Invalid input. Length and width must be greater than or equal to 2.");
        }
        if (length - width > 5 || width - length > 5)
        {
            Console.WriteLine("Area of the rectangle: " + (length * width));
        }
        else
        {
            Console.WriteLine("Perimeter of the rectangle: " + (2 * (length + width)));
        }
    }

    static void TriangleMenu()
    {
        double height;
        double width;
        string choice;
        // Odd numbers remaining
        int countOddNumbersLeft = 0;
        // Remaining numbers
        double NumbersLeft;
        // Saving the width in an additional variable
        double saveWidth;
        // Whether there is an extra line that needs to be printed initially
        bool isMoreLine = false;
        // How many times each line needs to repeat itself
        double countOfRepeat;
        // Number of rows left to print
        double numberOfRowsLeft;
        // The next odd number
        int nextOddNumber = 3;

        Console.Write("Enter the height of the rectangle: ");
        height = double.Parse(Console.ReadLine()!);
        Console.Write("Enter the width of the rectangle: ");
        width = double.Parse(Console.ReadLine()!);
        NumbersLeft = width - 2;
        saveWidth = width;
        if (height < 2 || width < 2)
        {
            Console.WriteLine("Invalid input. Length and width must be greater than or equal to 2.");
        }
        Console.WriteLine("1. Calculate perimeter of equilateral triangle");
        Console.WriteLine("2. Print equilateral triangle");
        Console.Write("Please enter your choice (1/2/3): ");
        choice = Console.ReadLine()!;

        // Calculating the perimeter of the triangle using Pythagoras theorem
        if (choice == "1")
        {
            double a = width / 2;
            double b = height;
            double c = Math.Sqrt(Math.Pow(a, 2) + Math.Pow(b, 2));
            Console.WriteLine("The perimeter of the triangle is: " + (a + (2 * c)));
        }
        // Printing the triangle
        else if (choice == "2")
        {
            // Number of rows left to print excluding the first and last rows
            numberOfRowsLeft = height - 2;
            for (int i = 0; i < (width - 1) / 2; i++)
            {
                Console.Write(' ');
            }
            Console.WriteLine('*');
            // Counting the remaining odd numbers
            while (NumbersLeft > 1)
            {
                countOddNumbersLeft++;
                NumbersLeft -= 2;
            }
            // Checking if there is an extra line
            if (countOddNumbersLeft / 2 != 0)
            {
                isMoreLine = true;
                for (int i = 0; i < (width - 3) / 2; i++)
                {
                    Console.Write(' ');
                }
                Console.WriteLine("***");

                numberOfRowsLeft -= 1;

            }
            // How many times each line repeats itself
            countOfRepeat = isMoreLine ? (width - 2) : (width - 3);
            countOfRepeat /= countOddNumbersLeft;

            for (int i = 0; i < numberOfRowsLeft; i++)
            {
                for (int g = 0; g < countOfRepeat; g++)
                {
                    for (int p = 0; p < (width - nextOddNumber) / 2; p++)
                    {
                        Console.Write(' ');
                    }

                    for (double j = 0; j < nextOddNumber; j++)
                    {
                        Console.Write('*');
                    }
                    numberOfRowsLeft -= 1;
                    Console.WriteLine();
                }
                nextOddNumber += 2;
            }

            for (int i = 0; i < saveWidth; i++)
                Console.Write('*');
            Console.WriteLine();
        }


        else
        {
            Console.WriteLine("Invalid choice. Please enter 1 or 2.");
        }
    }

    static void Main(string[] args)
    {
        while (true)
        {
            Console.WriteLine("\nMain Menu:");
            Console.WriteLine("1. Rectangle");
            Console.WriteLine("2. Triangle");
            Console.WriteLine("3. Exit");
            Console.Write("Please enter your choice (1/2/3): ");
            string choice = Console.ReadLine()!;
            if (choice == "1")
            {
                RectangleMenu();
            }
            else if (choice == "2")
            {
                TriangleMenu();
            }
            else if (choice == "3")
            {
                break;
            }
            else
            {
                Console.WriteLine("Invalid choice. Please enter 1, 2, or 3.");
            }
        }
    }
}
