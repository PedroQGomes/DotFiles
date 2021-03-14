package repository;

import models.Quiz;
import models.Solved;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface SolvedRepository extends PagingAndSortingRepository<Solved, String> {

    Page<Solved> findByUser(String user, Pageable pageable);
}
