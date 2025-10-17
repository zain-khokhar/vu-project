<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SellerDashboard.aspx.cs"
    MasterPageFile="~/Site.Master" Inherits="WebApplication1.SellerDashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="container my-4">
        <h2 class="mb-4">Seller Dashboard</h2>

        <!-- Hidden field to store active tab -->
        <asp:HiddenField ID="hfActiveTab" runat="server" Value="add-product" />

        <!-- Navigation Tabs -->
        <ul class="nav nav-tabs mb-4" id="sellerTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="add-product-tab" data-bs-toggle="tab" data-bs-target="#add-product" type="button" role="tab" onclick="setActiveTab('add-product')">
                    <i class="fas fa-plus-circle"></i> Add Product
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="products-tab" data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab" onclick="setActiveTab('products')">
                    <i class="fas fa-box"></i> My Products
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" type="button" role="tab" onclick="setActiveTab('orders')">
                    <i class="fas fa-shopping-cart"></i> Orders
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="stats-tab" data-bs-toggle="tab" data-bs-target="#stats" type="button" role="tab" onclick="setActiveTab('stats')">
                    <i class="fas fa-chart-bar"></i> Statistics
                </button>
            </li>
        </ul>

        <asp:Label ID="lblMessage" runat="server" CssClass="alert" Visible="false"></asp:Label>

        <!-- Tab Content -->
        <div class="tab-content" id="sellerTabsContent">
            
            <!-- Add Product Tab -->
            <div class="tab-pane fade show active" id="add-product" role="tabpanel">
                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">
                            <asp:Literal ID="litFormTitle" runat="server" Text="Add New Product"></asp:Literal>
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row g-3">
                            <asp:HiddenField ID="hdnProductId" runat="server" />
                            
                            <div class="col-md-6">
                                <label class="form-label">Product Name <span class="text-danger">*</span></label>
                                <asp:TextBox ID="txtName" runat="server" CssClass="form-control" placeholder="Enter product name" MaxLength="200"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="rfvName" runat="server" ControlToValidate="txtName" 
                                    ErrorMessage="Product name is required" CssClass="text-danger" Display="Dynamic" />
                            </div>

                            <div class="col-md-3">
                                <label class="form-label">Price <span class="text-danger">*</span></label>
                                <asp:TextBox ID="txtPrice" runat="server" CssClass="form-control" placeholder="0.00" TextMode="Number" step="0.01"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="rfvPrice" runat="server" ControlToValidate="txtPrice" 
                                    ErrorMessage="Price is required" CssClass="text-danger" Display="Dynamic" />
                            </div>

                            <div class="col-md-3">
                                <label class="form-label">Stock Quantity <span class="text-danger">*</span></label>
                                <asp:TextBox ID="txtStock" runat="server" CssClass="form-control" placeholder="0" TextMode="Number" min="0"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="rfvStock" runat="server" ControlToValidate="txtStock" 
                                    ErrorMessage="Stock is required" CssClass="text-danger" Display="Dynamic" />
                            </div>

                            <div class="col-md-12">
                                <label class="form-label">Description</label>
                                <asp:TextBox ID="txtDescription" runat="server" TextMode="MultiLine" Rows="3" 
                                    CssClass="form-control" placeholder="Product description" MaxLength="1000"></asp:TextBox>
                            </div>

                            <div class="col-md-6">
                                <label class="form-label">Stock Status</label>
                                <asp:DropDownList ID="ddlStockStatus" runat="server" CssClass="form-select">
                                    <asp:ListItem Text="In Stock" Value="In Stock" Selected="True"></asp:ListItem>
                                    <asp:ListItem Text="Out of Stock" Value="Out of Stock"></asp:ListItem>
                                    <asp:ListItem Text="Limited Stock" Value="Limited Stock"></asp:ListItem>
                                </asp:DropDownList>
                            </div>

                            <div class="col-md-6">
                                <label class="form-label">Upload Image</label>
                                <asp:FileUpload ID="fileImage" runat="server" CssClass="form-control" />
                                <asp:Label ID="lblCurrentImage" runat="server" CssClass="form-text text-muted mt-1" Visible="false"></asp:Label>
                            </div>

                            <div class="col-md-12 text-center mt-3">
                                <asp:Button ID="btnAdd" runat="server" Text="Add Product" CssClass="btn btn-success px-4 me-2" OnClick="btnAdd_Click" />
                                <asp:Button ID="btnCancel" runat="server" Text="Cancel" CssClass="btn btn-secondary px-4" OnClick="btnCancel_Click" CausesValidation="false" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- My Products Tab -->
            <div class="tab-pane fade" id="products" role="tabpanel">
                <div class="card">
                    <div class="card-header">
                        <h5>Manage Your Products</h5>
                    </div>
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <asp:DropDownList ID="ddlStatusFilter" runat="server" CssClass="form-select" AutoPostBack="true"
                                    OnSelectedIndexChanged="ddlStatusFilter_SelectedIndexChanged">
                                    <asp:ListItem Text="All Products" Value="" />
                                    <asp:ListItem Text="Approved" Value="Approved" />
                                    <asp:ListItem Text="Pending" Value="Pending" />
                                    <asp:ListItem Text="Rejected" Value="Rejected" />
                                </asp:DropDownList>
                            </div>
                            <div class="col-md-4">
                                <input type="text" id="txtSearchProduct" placeholder="Search by name" class="form-control" onkeyup="filterProductTable()" />
                            </div>
                            <div class="col-md-4 text-end">
                                <asp:Button ID="btnRefreshProducts" runat="server" Text="Refresh" CssClass="btn btn-outline-primary" OnClick="btnRefreshProducts_Click" />
                            </div>
                        </div>

                        <asp:GridView ID="gvProducts" runat="server" AutoGenerateColumns="False" DataKeyNames="Id"
                            CssClass="table table-striped table-hover" OnRowCommand="gvProducts_RowCommand"
                            OnRowDeleting="gvProducts_RowDeleting" OnRowEditing="gvProducts_RowEditing"
                            OnRowCancelingEdit="gvProducts_RowCancelingEdit" OnRowUpdating="gvProducts_RowUpdating">
                            <Columns>
                                <asp:BoundField DataField="Id" HeaderText="ID" ReadOnly="true" />
                                <asp:BoundField DataField="Name" HeaderText="Product Name" ReadOnly="true" />
                                <asp:BoundField DataField="Price" HeaderText="Price" DataFormatString="${0:0.00}" ReadOnly="true" />
                                <asp:TemplateField HeaderText="Stock">
                                    <ItemTemplate>
                                        <%# Eval("Stock") %>
                                    </ItemTemplate>
                                    <EditItemTemplate>
                                        <asp:TextBox ID="txtEditStock" runat="server" Text='<%# Bind("Stock") %>' 
                                            CssClass="form-control form-control-sm" TextMode="Number" min="0" Width="80px"></asp:TextBox>
                                    </EditItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Stock Status">
                                    <ItemTemplate>
                                        <span class='badge <%# GetStockStatusBadge(Eval("StockStatus").ToString()) %>'>
                                            <%# Eval("StockStatus") %>
                                        </span>
                                    </ItemTemplate>
                                    <EditItemTemplate>
                                        <asp:DropDownList ID="ddlEditStockStatus" runat="server" CssClass="form-select form-select-sm"
                                            SelectedValue='<%# Bind("StockStatus") %>'>
                                            <asp:ListItem Text="In Stock" Value="In Stock" />
                                            <asp:ListItem Text="Out of Stock" Value="Out of Stock" />
                                            <asp:ListItem Text="Limited Stock" Value="Limited Stock" />
                                        </asp:DropDownList>
                                    </EditItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Status">
                                    <ItemTemplate>
                                        <span class='badge <%# GetStatusBadge(Eval("Status").ToString()) %>'>
                                            <%# Eval("Status") %>
                                        </span>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Image">
                                    <ItemTemplate>
                                        <img src='<%# Eval("ImageUrl") %>' style="width:50px; height:40px; object-fit:cover; cursor:pointer;" 
                                             onclick='showImageModal("<%# Eval("ImageUrl") %>")' />
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Actions">
                                    <ItemTemplate>
                                        <asp:Button ID="btnEditProduct" runat="server" CommandName="EditProduct" CommandArgument='<%# Eval("Id") %>'
                                            Text="Edit" CssClass="btn btn-sm btn-primary me-1" />
                                        <asp:Button ID="btnEditStock" runat="server" CommandName="Edit"
                                            Text="Stock" CssClass="btn btn-sm btn-warning me-1" />
                                        <asp:Button ID="btnDelete" runat="server" CommandName="Delete" CommandArgument='<%# Eval("Id") %>'
                                            Text="Delete" CssClass="btn btn-sm btn-danger" 
                                            OnClientClick="return confirm('Are you sure you want to delete this product?');" />
                                    </ItemTemplate>
                                    <EditItemTemplate>
                                        <asp:Button ID="btnUpdate" runat="server" CommandName="Update" Text="Save" CssClass="btn btn-sm btn-success me-1" />
                                        <asp:Button ID="btnCancelEdit" runat="server" CommandName="Cancel" Text="Cancel" CssClass="btn btn-sm btn-secondary" />
                                    </EditItemTemplate>
                                </asp:TemplateField>
                            </Columns>
                        </asp:GridView>
                    </div>
                </div>
            </div>

            <!-- Orders Tab -->
            <div class="tab-pane fade" id="orders" role="tabpanel">
                <div class="card">
                    <div class="card-header">
                        <h5>Orders for Your Products</h5>
                    </div>
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <asp:DropDownList ID="ddlOrderStatusFilter" runat="server" CssClass="form-select" AutoPostBack="true"
                                    OnSelectedIndexChanged="ddlOrderStatusFilter_SelectedIndexChanged">
                                    <asp:ListItem Text="All Orders" Value="" />
                                    <asp:ListItem Text="Pending" Value="Pending" />
                                    <asp:ListItem Text="Completed" Value="Completed" />
                                    <asp:ListItem Text="Cancelled" Value="Cancelled" />
                                </asp:DropDownList>
                            </div>
                            <div class="col-md-4">
                                <input type="text" id="txtSearchOrder" placeholder="Search by product or customer" class="form-control" onkeyup="filterOrderTable()" />
                            </div>
                        </div>

                        <asp:GridView ID="gvOrders" runat="server" AutoGenerateColumns="False" 
                            CssClass="table table-striped table-hover" EmptyDataText="No orders yet for your products.">
                            <Columns>
                                <asp:BoundField DataField="OrderId" HeaderText="Order #" />
                                <asp:BoundField DataField="ProductName" HeaderText="Product" />
                                <asp:BoundField DataField="Quantity" HeaderText="Qty" />
                                <asp:BoundField DataField="Price" HeaderText="Price" DataFormatString="${0:0.00}" />
                                <asp:BoundField DataField="TotalAmount" HeaderText="Total" DataFormatString="${0:0.00}" />
                                <asp:BoundField DataField="CustomerName" HeaderText="Customer" />
                                <asp:BoundField DataField="OrderDate" HeaderText="Order Date" DataFormatString="{0:MMM dd, yyyy}" />
                                <asp:TemplateField HeaderText="Status">
                                    <ItemTemplate>
                                        <span class='badge <%# GetOrderStatusBadge(Eval("OrderStatus").ToString()) %>'>
                                            <%# Eval("OrderStatus") %>
                                        </span>
                                    </ItemTemplate>
                                </asp:TemplateField>
                            </Columns>
                        </asp:GridView>
                    </div>
                </div>
            </div>

            <!-- Statistics Tab -->
            <div class="tab-pane fade" id="stats" role="tabpanel">
                <div class="row">
                    <div class="col-md-3">
                        <div class="card bg-primary text-white mb-3">
                            <div class="card-body text-center">
                                <h3><asp:Label ID="lblTotalProducts" runat="server" Text="0"></asp:Label></h3>
                                <p>Total Products</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card bg-success text-white mb-3">
                            <div class="card-body text-center">
                                <h3><asp:Label ID="lblApprovedProducts" runat="server" Text="0"></asp:Label></h3>
                                <p>Approved</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card bg-warning text-white mb-3">
                            <div class="card-body text-center">
                                <h3><asp:Label ID="lblPendingProducts" runat="server" Text="0"></asp:Label></h3>
                                <p>Pending Approval</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card bg-danger text-white mb-3">
                            <div class="card-body text-center">
                                <h3><asp:Label ID="lblRejectedProducts" runat="server" Text="0"></asp:Label></h3>
                                <p>Rejected</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-md-4">
                        <div class="card bg-info text-white mb-3">
                            <div class="card-body text-center">
                                <h3><asp:Label ID="lblTotalOrders" runat="server" Text="0"></asp:Label></h3>
                                <p>Total Orders</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card bg-dark text-white mb-3">
                            <div class="card-body text-center">
                                <h3>$<asp:Label ID="lblTotalRevenue" runat="server" Text="0.00"></asp:Label></h3>
                                <p>Total Revenue</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card bg-secondary text-white mb-3">
                            <div class="card-body text-center">
                                <h3><asp:Label ID="lblOutOfStock" runat="server" Text="0"></asp:Label></h3>
                                <p>Out of Stock</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Image Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Product Image</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <img id="modalImg" src="" class="img-fluid" />
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Store active tab in hidden field
        function setActiveTab(tabName) {
            document.getElementById('<%= hfActiveTab.ClientID %>').value = tabName;
        }

        // Initialize active tab on page load
        document.addEventListener('DOMContentLoaded', function() {
            var activeTab = document.getElementById('<%= hfActiveTab.ClientID %>').value || 'add-product';
            
            // Remove active class from all tabs and content
            var tabs = document.querySelectorAll('.nav-link');
            tabs.forEach(function(tab) {
                tab.classList.remove('active');
            });
            
            var tabContents = document.querySelectorAll('.tab-pane');
            tabContents.forEach(function(content) {
                content.classList.remove('show', 'active');
            });
            
            // Add active class to current tab
            var activeTabButton = document.getElementById(activeTab + '-tab');
            if (activeTabButton) {
                activeTabButton.classList.add('active');
            }
            
            // Show active tab content
            var activeContent = document.getElementById(activeTab);
            if (activeContent) {
                activeContent.classList.add('show', 'active');
            }
        });

        function showImageModal(url) {
            document.getElementById('modalImg').src = url;
            var myModal = new bootstrap.Modal(document.getElementById('imageModal'));
            myModal.show();
        }

        function filterProductTable() {
            var input = document.getElementById("txtSearchProduct");
            var filter = input.value.toUpperCase();
            var table = document.getElementById("<%= gvProducts.ClientID %>");
            var tr = table.getElementsByTagName("tr");

            for (var i = 1; i < tr.length; i++) {
                var td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    var txtValue = td.textContent || td.innerText;
                    tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
                }
            }
        }

        function filterOrderTable() {
            var input = document.getElementById("txtSearchOrder");
            var filter = input.value.toUpperCase();
            var table = document.getElementById("<%= gvOrders.ClientID %>");
            var tr = table.getElementsByTagName("tr");

            for (var i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[1]; // Product name
                var td5 = tr[i].getElementsByTagName("td")[5]; // Customer name
                if (td1 || td5) {
                    var txtValue1 = td1 ? td1.textContent || td1.innerText : "";
                    var txtValue5 = td5 ? td5.textContent || td5.innerText : "";
                    tr[i].style.display = (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue5.toUpperCase().indexOf(filter) > -1) ? "" : "none";
                }
            }
        }
    </script>
</asp:Content>
