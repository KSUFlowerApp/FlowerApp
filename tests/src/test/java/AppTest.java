import org.junit.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class AppTest
{
    private WebDriver webDriver;
    String url;

    By loginUsername = By.id("loginUsername");
    By loginPassword = By.id("loginPassword");
    By loginButton = By.id("loginButton");

    @Before
    public void setup()
    {
        webDriver = new FirefoxDriver();
        url  = "localhost:3000";
        webDriver.get(url);
    }

    @Test
    public void testLogin()
    {
        webDriver.findElement(loginUsername).sendKeys("autotest");
        webDriver.findElement(loginPassword).sendKeys("autotest");
        webDriver.findElement(loginButton).click();
    }

    @After
    public void teardown()
    {
        webDriver.close();
    }
}
