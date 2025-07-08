import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        while (true) {
            System.out.print("Enter number A: ");
            String inputA = scanner.next();
            if (inputA.equalsIgnoreCase("exit")) {
                break;
            }
            double a;
            try {
                a = Double.parseDouble(inputA);
            } catch (NumberFormatException e) {
                System.out.println("Invalid input for number A. Try again.");
                continue;
            }

            System.out.print("Enter number B: ");
            String inputB = scanner.next();
            double b;
            try {
                b = Double.parseDouble(inputB);
            } catch (NumberFormatException e) {
                System.out.println("Error: Invalid input for number B.");
                continue;
            }

            System.out.print("Enter operator (+, -, *, /): ");
            char operator = scanner.next().charAt(0);

            double result;
            switch (operator) {
                case '+':
                    result = a + b;
                    System.out.println("Result: " + result);
                    break;
                case '-':
                    result = a - b;
                    System.out.println("Result: " + result);
                    break;
                case '*':
                    result = a * b;
                    System.out.println("Result: " + result);
                    break;
                case '/':
                    // if (b == 0) {
                    //     System.out.println("Error: Division by zero");
                    // } else {
                    //     result = a / b;
                    //     System.out.println("Result: " + result);
                    // }

                    result = a / b;
                    System.out.println("Result: " + result);
                    break;
                default:
                    System.out.println("Unknown operator");
            }
            System.out.println();
        }
        
        scanner.close();
    }
}
