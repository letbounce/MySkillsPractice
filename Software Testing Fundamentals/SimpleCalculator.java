import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter number A: ");
        double a = scanner.nextDouble();

        System.out.print("Enter number B: ");
        double b = scanner.nextDouble();

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
                if (b == 0) {
                    System.out.println("Error: Division by zero");
                } else {
                    result = a / b;
                    System.out.println("Result: " + result);
                }
                break;
            default:
                System.out.println("Unknown operator");
        }

        scanner.close();
    }
}
