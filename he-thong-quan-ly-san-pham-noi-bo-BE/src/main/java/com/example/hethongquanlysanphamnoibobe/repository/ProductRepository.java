package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.*;
import com.example.hethongquanlysanphamnoibobe.dto.projection.CustomerSearchInfo;
import com.example.hethongquanlysanphamnoibobe.dto.projection.ProductInfo;
import com.example.hethongquanlysanphamnoibobe.dto.projection.ProductProjection;
import com.example.hethongquanlysanphamnoibobe.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Optional<Product> findProductByIME(String IME);
    Optional<Product> findByCustomer_Id(Integer id);


    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductDto " +
            "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, p.status, p.isRepair) " +
            "from Product p " +
            "where p.id = ?1 and p.engineer.id = ?2 ")
    Optional<ProductDto> getProductById(Integer productId, Integer userId);


    // khu vực nhân viên chung
    // ###########################################################################################################

    @Query("select p from Product p where p.id = :id and p.engineer.id = :userId and p.status = false ")
    Optional<Product> findProductById_Engineer(@Param("id") Integer id,@Param("userId") Integer userId);
    @Query("select p from Product p where p.id = :id and p.status = true and p.isRepair = true ")
    Optional<Product> findProductById_Eng(@Param("id") Integer id);

    /// <--------------------------------------> <>
    @Query("select p from Product p where p.id = ?1 and p.engineer is null and p.status = false ")
    Optional<Product> findProductById(Integer id);

    @Query("select p from Product p where p.id = ?1 and p.engineer is not null and p.status = false and p.isRepair = false ")
    Optional<Product> findProductById_Recep(Integer id);

    @Query("select p from Product p where p.id = ?1 and p.status = false and p.isRepair = true and p.engineer is not null ")
    Optional<Product> findProductById_Warranty(Integer id);


    // lấy ra sản phẩm theo id => trả về là dto

    @Query("select p from Product p where p.id = ?1 ")
    Optional<ProductInfo> getproductById(Integer id);


    // khu vực nhân viên lễ tân
    // ###########################################################################################################

    // lấy ra danh sách sản phẩm mới đăng ký chưa chuyển cho người sửa chữa có phân trang

    @Query("select p from Product p where p.IME like %?1% and p.status = ?2 and p.isRepair = false order by p.inputDate asc ")
    Page<ProductProjection> findProductWaitingRepairAll(Pageable pageable, String term,Product.ProductStatus productStatus);

    @Query("select p from Product p where p.IME like %?1% and p.status = ?2 and p.isRepair = false order by p.isRepair asc ")
    Page<ProductProjection> findProductWaitingRegisterGuaranteeAll(PageRequest of, String term, Product.ProductStatus productStatus);

    // lấy ra danh sách sản phẩm sửa chữa ok có phân trang
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.HistoryProductDto" +
            "(p.id," +
            "p.nameModel, " +
            "p.phoneCompany, " +
            "p.IME, " +
            "p.defectName, " +
            "p.status, " +
            "p.price, " +
            "p.isRepair," +
            "p.charge, " +
            "p.inputDate, " +
            "recep.employeeCode, " +
            "recep.employeeName," +
            "p.transferDate, " +
            "engi.employeeCode," +
            "engi.employeeName, " +
            "p.location, " +
            "p.note, " +
            "p.outputDate, " +
            "pl.employeeCode," +
            "pl.employeeName, " +
            "p.finishDate, " +
            "c.fullName," +
            "c.email," +
            "c.phoneNumber," +
            "cp.name," +
            "cp.warrantyPeriod," +
            "g.guaranteeCode ) " +
            "from Product p " +
            "left join Customer c on c.id = p.customer.id " +
            "left join Components cp on cp.id = p.components.id " +
            "left join User recep on recep.id = p.receptionists.id " +
            "left join User engi on engi.id = p.engineer.id " +
            "left join User pl on pl.id = p.productPayer.id " +
            "left join Guarantee g on g.product.id = p.id " +
            "where p.IME like %?1% and p.status = true and p.finishDate is null and p.isRepair = false " +
            "order by p.outputDate asc ")
    Page<HistoryProductDto> getPageProductStatusOK(Pageable pageable, String term);

    // tìm kiếm lích sử sản phẩm có phần trang
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.HistoryProductDto" +
            "(p.id," +
            "p.nameModel, " +
            "p.phoneCompany, " +
            "p.IME, " +
            "p.defectName, " +
            "p.status, " +
            "p.price, " +
            "p.isRepair," +
            "p.charge, " +
            "p.inputDate, " +
            "recep.employeeCode, " +
            "recep.employeeName," +
            "p.transferDate, " +
            "engi.employeeCode," +
            "engi.employeeName, " +
            "p.location, " +
            "p.note, " +
            "p.outputDate, " +
            "pl.employeeCode," +
            "pl.employeeName, " +
            "p.finishDate, " +
            "c.fullName," +
            "c.email," +
            "c.phoneNumber," +
            "cp.name," +
            "cp.warrantyPeriod," +
            "g.guaranteeCode ) " +
            "from Product p " +
            "left join Customer c on c.id = p.customer.id " +
            "left join Components cp on cp.id = p.components.id " +
            "left join User recep on recep.id = p.receptionists.id " +
            "left join User engi on engi.id = p.engineer.id " +
            "left join User pl on pl.id = p.productPayer.id " +
            "left join Guarantee g on g.product.id = p.id " +
            "where p.IME like %?1% " +
            "order by p.inputDate asc ")
    Page<HistoryProductDto> searchHistoryProductByTerm(Pageable pageable, String term);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductAndEngineerDto" +
            "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, u.employeeCode, u.employeeName, p.status, p.isRepair) " +
            "from Product p " +
            "join User u on u.id = p.engineer.id " +
            "where p.status = false and p.isRepair = false and p.IME like %?1%")
    Page<ProductAndEngineerDto> getListProductsPending(Pageable pageable, String term);

    // lấy ra danh sách khách hàng có sản phẩm đã sửa xong có phân trang
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.CustomerDto" +
            "(c.id, c.fullName, c.phoneNumber, c.email, c.address, count (p.id)) " +
            "from Customer c " +
            "left join Product p on p.customer.id = c.id " +
            "where (c.phoneNumber like %?1% or c.email like %?1% ) and p.status = true " +
            "group by c.id ")
    Page<CustomerDto> searchProductStatusOKByCustomer(Pageable pageable, String term);


    // lấy ra danh sách khách hàng có sản phẩm đang pending chờ sửa có phân trang
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.CustomerDto" +
            "(c.id, c.fullName, c.phoneNumber, c.email, c.address, count (p.id)) " +
            "from Customer c " +
            "left join Product p on p.customer.id = c.id " +
            "where (c.phoneNumber like %?1% or c.email like %?1% and c.fullName like %?1% ) " +
            "group by c.id ")
    Page<CustomerDto> searchProductStatusPendingByCustomer(Pageable pageable, String term);

    // chưa test
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductDto" +
            "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, p.status, p.isRepair ) " +
            "from Product p " +
            "left join Customer c on p.customer.id = c.id " +
            "where c.id = ?1 and p.isRepair = false ")
    Page<ProductDto> getListProductByCustomerId(Pageable pageable, Integer id);


    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductCustomerDto" +
            "(p.id," +
            "p.nameModel, " +
            "p.phoneCompany, " +
            "p.IME," +
            "p.status, " +
            "c.id, " +
            "c.fullName," +
            "c.phoneNumber," +
            "c.email," +
            "c.address ) " +
            "from Product p " +
            "join p.customer c " +
            "where p.IME = ?1 and p.status = true and p.isRepair = false and p.finishDate is not null and p.id not in (select g.product.id from Guarantee g )" +
            "order by p.outputDate asc ")
    ProductCustomerDto getProductByIme(String ime);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductCustomerDto" +
            "(p.id," +
            "p.nameModel, " +
            "p.phoneCompany, " +
            "p.IME," +
            "p.status, " +
            "c.id, " +
            "c.fullName," +
            "c.phoneNumber," +
            "c.email," +
            "c.address ) " +
            "from Product p " +
            "join p.customer c " +
            "where p.id = ?1 and p.status = true and p.isRepair = false and p.finishDate is not null and p.id not in (select g.product.id from Guarantee g )" +
            "order by p.outputDate asc ")
    ProductCustomerDto getProductAndCustomerById(Integer id);


    // khu vực nhân viên sửa chữa
    // ###########################################################################################################

 // danh sách sửa chữa theo id người sửa => hàng mới
 @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductDto " +
         "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, p.status, p.isRepair) " +
         "from Product p " +
         "where p.engineer.id = :id and p.status = false and p.IME like %:term% ")
 Page<ProductDto> getListProductByUser(Pageable pageable, @Param("id") Integer id,@Param("term") String term);




    // khu vực nhân viên kho
    // ###########################################################################################################


    // khu vực nhân viên bảo hành
    // ###########################################################################################################

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductDto" +
            "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, p.status, p.charge) " +
            "from Product p " +
            "where p.isRepair = true and p.status = false and p.engineer is null ")
    Page<ProductDto> getListProductPendingNoEngineer(Pageable pageable, String term);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.HistoryProductDto" +
            "(p.id," +
            "p.nameModel, " +
            "p.phoneCompany, " +
            "p.IME, " +
            "p.defectName, " +
            "p.status, " +
            "p.price, " +
            "p.isRepair," +
            "p.charge, " +
            "p.inputDate, " +
            "recep.employeeCode, " +
            "recep.employeeName," +
            "p.transferDate, " +
            "engi.employeeCode," +
            "engi.employeeName, " +
            "p.location, " +
            "p.note, " +
            "p.outputDate, " +
            "pl.employeeCode," +
            "pl.employeeName, " +
            "p.finishDate, " +
            "c.fullName," +
            "c.email," +
            "c.phoneNumber," +
            "cp.name," +
            "cp.warrantyPeriod," +
            "g.guaranteeCode ) " +
            "from Product p " +
            "left join Customer c on c.id = p.customer.id " +
            "left join Components cp on cp.id = p.components.id " +
            "left join User recep on recep.id = p.receptionists.id " +
            "left join User engi on engi.id = p.engineer.id " +
            "left join User pl on pl.id = p.productPayer.id " +
            "left join Guarantee g on g.product.id = p.id " +
            "where p.IME = ?1 " +
            "order by p.outputDate asc ")
    List<HistoryProductDto> getListHistoryProductByIME(String ime);

    // lấy danh sách sản phẩm bảo hành sửa chữa ok
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductGuaranteeDto " +
            "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, p.location, p.note, p.components.name, p.price, p.status, p.isRepair, p.charge) " +
            "from Product p " +
            "where p.status = true and p.isRepair = true and p.IME like %?1% ")
    Page<ProductGuaranteeDto> findProductGuaranteeStatusOKByTerm(Pageable pageable, String term);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductAndEngineerDto" +
            "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, u.employeeCode, u.employeeName, p.status, p.isRepair) " +
            "from Product p " +
            "join User u on u.id = p.engineer.id " +
            "where p.status = false and p.isRepair = true and p.IME like %?1%")
    Page<ProductAndEngineerDto> findProductEngineerPendingAll(Pageable pageable, String term);
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductAndEngineerDto" +
            "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, u.employeeCode, u.employeeName, p.status, p.isRepair) " +
            "from Product p " +
            "join User u on u.id = p.engineer.id " +
            "where p.status = false and p.isRepair = true and p.id = ?1 ")
    Optional<ProductAndEngineerDto> findProductPendingEngineerById(Integer id);




    // khu vực ADMIN
    // ###########################################################################################################

    @Query("select p from Product p where p.IME like %?1% ")
    Page<ProductProjection> findProductAlls(Pageable pageable, String term);



    @Query("select p from Product p where p.id = ?1 ")
    Optional<ProductProjection> findProductProjectionById(Integer id);

    @Query("SELECT p FROM Product p WHERE p.status = true AND FUNCTION('DATE', p.outputDate) = CURRENT_DATE ")
    Page<ProductProjection> findProductOKAlls(Pageable pageable);


    @Query("select p from Product p where p.status = false ")
    Page<ProductProjection> findProductPendingAlls(Pageable pageable);

    // xóa 1 sản phẩm không xóa các bảng liên quan
    @Modifying
    @Query("delete from Product p where p.id = ?1 ")
    void deleteById(Integer id);



    @Query("select count(p) from Product p " +
            "join p.engineer u " +
            "join u.roles rl " +
            "where u.employeeCode = ?1 and rl.name = 'NHANVIENSUACHUA' and p.status= true and function('DATE', p.outputDate) = current_date ")
   long countTotalProductOKByEmployeeCode (String employeeCode);

    @Query("select count(p) from Product p " +
            "join p.engineer u " +
            "join u.roles rl " +
            "where u.employeeCode = ?1 and rl.name = 'NHANVIENSUACHUA' and p.status= false ")
    long countTotalProductPendingByEmployeeCode (String employeeCode);


    @Query("select count(p) from Product p " +
            "join p.engineer u " +
            "join u.roles rl " +
            "where u.employeeCode = :employeeCode and rl.name = 'NHANVIENSUACHUA' and p.status= true and function('DATE', p.outputDate) = :previousDate ")
    long countTotalProductOKYesterdayByEmployeeCode (@Param("employeeCode") String employeeCode, @Param("previousDate") LocalDate previousDate);

    @Query("select count(p) from Product p " +
            "join p.engineer u " +
            "join u.roles rl " +
            "where u.employeeCode = :employeeCode and rl.name = 'NHANVIENSUACHUA' and ((p.status= false and p.transferDate < current_date ) or (p.status = true and p.finishDate = current_date) ) ")
    long countTotalProductPendingYesterdayByEmployeeCode (@Param("employeeCode") String employeeCode);

    @Query("select coalesce(sum(p.price), 0) from Product p where function('DATE', p.finishDate) = current_date and p.finishDate is not null ")
    long sumTotalPriceProductByToday();
    @Query("select coalesce(sum(p.price), 0) from Product p where month(p.finishDate) = month(current_date) and year(p.finishDate) = year(current_date) and p.finishDate is not null ")
    long sumTotalPriceProductByMonth();
    @Query("select coalesce(sum(p.price), 0) from Product p where month(p.finishDate) = (month(current_date) - 1) and year(p.finishDate) = year(current_date) and p.finishDate is not null ")
    long sumTotalPriceProductByLastMonth();
    @Query("select coalesce(sum(p.price), 0) from Product p where year(p.finishDate) = year(current_date) and p.finishDate is not null ")
    long sumTotalPriceProductByYear();
    @Query("select coalesce(sum(p.price), 0) from Product p where year(p.finishDate) = (year(current_date) - 1) and p.finishDate is not null ")
    long sumTotalPriceProductBy1YearAgo();
    @Query("select coalesce(sum(p.price), 0) from Product p where year(p.finishDate) = (year(current_date) - 2) and p.finishDate is not null ")
    long sumTotalPriceProductBy2YearAgo();
    @Query("select coalesce(sum(p.price), 0) from Product p where year(p.finishDate) = (year(current_date) - 3) and p.finishDate is not null ")
    long sumTotalPriceProductBy3YearAgo();
    @Query("select coalesce(sum(p.price), 0) from Product p where year(p.finishDate) = (year(current_date) - 4) and p.finishDate is not null ")
    long sumTotalPriceProductBy4YearAgo();
    @Query("select coalesce(sum(p.price), 0) from Product p where year(p.finishDate) = year(current_date) and (month(p.finishDate) between 1 and 3 ) and p.finishDate is not null ")
    long sumTotalPriceProductByQ1();
    @Query("select coalesce(sum(p.price), 0) from Product p where year(p.finishDate) = year(current_date) and (month(p.finishDate) between 4 and 6 ) and p.finishDate is not null ")
    long sumTotalPriceProductByQ2();
    @Query("select coalesce(sum(p.price), 0) from Product p where year(p.finishDate) = year(current_date) and (month(p.finishDate) between 7 and 9 ) and p.finishDate is not null ")
    long sumTotalPriceProductByQ3();
    @Query("select coalesce(sum(p.price), 0) from Product p where year(p.finishDate) = year(current_date) and (month(p.finishDate) between 10 and 12 ) and p.finishDate is not null ")
    long sumTotalPriceProductByQ4();

    // Khách hàng
    //###############################################################################
   @Query("select p from Product p join p.customer c where (:ime is null or p.IME like %:ime%) and (:phoneNumber is null or c.phoneNumber like %:phoneNumber%)")
    List<CustomerSearchInfo> searchHistoryProductByImeProductOrPhoneNumber(@Param("ime") String ime, @Param("phoneNumber") String phoneNumber);


}