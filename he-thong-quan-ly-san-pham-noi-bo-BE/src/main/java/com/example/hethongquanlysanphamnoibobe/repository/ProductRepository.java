package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.*;
import com.example.hethongquanlysanphamnoibobe.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findProductById(Integer id);

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
            "p.inputDate, " +
            "p.transferDate, " +
            "p.location, " +
            "p.outputDate, " +
            "p.charge," +
            "p.finishDate, " +
            "recep.employeeCode, " +
            "recep.employeeName," +
            "engi.employeeCode," +
            "engi.employeeName, " +
            "c.fullName," +
            "c.phoneNumber," +
            "cp.name ) " +
            "from Product p " +
            "left join Customer c on c.id = p.customer.id " +
            "left join Components cp on cp.id = p.components.id " +
            "left join User recep on recep.id = p.receptionists.id " +
            "left join User engi on engi.id = p.engineer.id " +
            "where p.IME like %?1% " +
            "order by p.inputDate asc ")
    Page<HistoryProductDto> searchHistoryProductByTerm(Pageable pageable, String term);

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
            "p.inputDate, " +
            "p.transferDate, " +
            "p.location, " +
            "p.outputDate, " +
            "p.charge," +
            "p.finishDate, " +
            "recep.employeeCode, " +
            "recep.employeeName," +
            "engi.employeeCode," +
            "engi.employeeName, " +
            "c.fullName," +
            "c.phoneNumber," +
            "cp.name ) " +
            "from Product p " +
            "left join Customer c on c.id = p.customer.id " +
            "left join Components cp on cp.id = p.components.id " +
            "left join User recep on recep.id = p.receptionists.id " +
            "left join User engi on engi.id = p.engineer.id " +
            "where p.IME like %?1% and p.status = true " +
            "order by p.outputDate asc ")
    Page<HistoryProductDto> getPageProductStatusOK(Pageable pageable, String term);

    // lấy ra sản phẩm theo id => trả về là dto
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.HistoryProductDto" +
            "(p.id," +
            "p.nameModel, " +
            "p.phoneCompany, " +
            "p.IME, " +
            "p.defectName, " +
            "p.status, " +
            "p.price, " +
            "p.isRepair," +
            "p.inputDate, " +
            "p.transferDate, " +
            "p.location, " +
            "p.outputDate, " +
            "p.charge," +
            "p.finishDate, " +
            "recep.employeeCode, " +
            "recep.employeeName," +
            "engi.employeeCode," +
            "engi.employeeName, " +
            "c.fullName," +
            "c.phoneNumber," +
            "cp.name ) " +
            "from Product p " +
            "left join Customer c on c.id = p.customer.id " +
            "left join Components cp on cp.id = p.components.id " +
            "left join User recep on recep.id = p.receptionists.id " +
            "left join User engi on engi.id = p.engineer.id " +
            "where p.id = ?1 ")
    Optional<HistoryProductDto> getproductById(Integer id);

    // lấy ra danh sách sản phẩm mới đăng ký chưa chuyển cho người sửa chữa có phân trang
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.HistoryProductDto" +
            "(p.id," +
            "p.nameModel, " +
            "p.phoneCompany, " +
            "p.IME, " +
            "p.defectName, " +
            "p.status, " +
            "p.price, " +
            "p.isRepair," +
            "p.inputDate, " +
            "p.transferDate, " +
            "p.location, " +
            "p.outputDate, " +
            "p.charge," +
            "p.finishDate, " +
            "recep.employeeCode, " +
            "recep.employeeName," +
            "engi.employeeCode," +
            "engi.employeeName, " +
            "c.fullName," +
            "c.phoneNumber," +
            "cp.name ) " +
            "from Product p " +
            "left join Customer c on c.id = p.customer.id " +
            "left join Components cp on cp.id = p.components.id " +
            "left join User recep on recep.id = p.receptionists.id " +
            "left join User engi on engi.id = p.engineer.id " +
            "where p.IME like %?1% and p.engineer = null " +
            "order by p.inputDate asc ")
    Page<HistoryProductDto> getPageProductNewCreate(Pageable pageable, String term);

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
            "where (c.phoneNumber like %?1% or c.email like %?1% ) and p.status = false " +
            "group by c.id ")
    Page<CustomerDto> searchProductStatusPendingByCustomer(Pageable pageable, String term);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.CustomerDto" +
            "(c.id, c.fullName, c.phoneNumber, c.email, c.address, p.status ) " +
            "from Customer c " +
            "left join Product p on p.customer.id = c.id " +
            "where c.id = ?1 ")
    Page<CustomerDto> getListProductByCustomerId(Pageable pageable, Integer id);

    // lấy ra hóa đơn theo ID
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.BillDto" +
            "(b.id, " +
            "c.fullName, " +
            "c.phoneNumber, " +
            "c.email, " +
            "p.phoneCompany, " +
            "p.nameModel, " +
            "p.IME, " +
            "p.defectName, " +
            "p.location, " +
            "cp.name, " +
            "cp.warrantyPeriod, " +
            "p.price ) " +
            "from Product p " +
            "left join Bill b on b.product.id = p.id " +
            "left join Customer c on c.id = p.customer.id " +
            "left join Components cp on cp.id = p.components.id " +
            "where b.id = ?1 ")
    Optional<BillDto> getBillById(Integer id);

   // danh sách sửa chữa theo id người sửa => hàng mới
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductDto " +
            "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, p.status, p.isRepair) " +
            "from Product p " +
            "where p.engineer.id = ?1 and p.status = false and p.isRepair = false ")
    Page<ProductDto> getListProductByUser(Pageable pageable, Integer id);

    // danh sách sửa chữa theo id người sửa => sản phẩm bảo hành
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductDto " +
            "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, p.status, p.isRepair) " +
            "from Product p " +
            "where p.engineer.id = ?1 and p.status = false and p.isRepair = true ")
    Page<ProductDto> getListProductByUserAndIsReapriTrue(Pageable pageable, Integer id);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductDto " +
            "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, p.status, p.isRepair) " +
            "from Product p " +
            "where p.id = ?1 and p.engineer.id = ?2 ")
    Optional<ProductDto> getProductById(Integer productId, Integer userId);


    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductCustomerDto(p.id, p.nameModel, p.phoneCompany, p.IME, c.id, c.fullName, c.phoneNumber, c.email, c.address ) " +
            "from Product p " +
            "left join Customer c on c.id = p.customer.id " +
            "where p.id = ?1 and p.finishDate != null ")
    Optional<ProductCustomerDto> findProductAndCustomerById(Integer id);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductDto " +
            "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, p.status, p.isRepair) " +
            "from Product p " +
            "where p.IME like %?1% and p.status = false and p.isRepair = true ")
    Page<ProductDto> getListProductWarrantyPending(Pageable pageable, String term);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductDto " +
            "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, p.status, p.isRepair) " +
            "from Product p " +
            "where p.IME like %?1% and p.status = true and p.isRepair = true ")
    Page<ProductDto> getListProductWarrantyOk(Pageable pageable, String term);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ProductDto " +
            "(p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, p.status, p.isRepair) " +
            "from Product p " +
            "where p.IME like %?1%  and p.isRepair = true ")
    Page<ProductDto> getListProductWarrantyAll(Pageable pageable, String term);
}