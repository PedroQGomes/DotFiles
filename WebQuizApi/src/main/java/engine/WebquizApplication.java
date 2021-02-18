package engine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories("repository")
@EntityScan("models")
@ComponentScan(basePackages = {"engine","services","controllers"})
public class WebquizApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebquizApplication.class, args);
    }

}
