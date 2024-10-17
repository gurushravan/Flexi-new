#Creame un grupo de recursos
resource "azurerm_resource_group" "RG" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_kubernetes_cluster" "AKS" {
  name                = var.aks_name
  location            = var.location
  resource_group_name = var.resource_group_name
  kubernetes_version  = var.kubernetes_version
  dns_prefix          = var.dns_prefix

  default_node_pool {
    name                = "aksnodepool"
    vm_size             = "Standard_B2pls_v2"
    enable_auto_scaling = true
    node_count          = 1
    min_count           = 1
    max_count           = 3
    vnet_subnet_id      = azurerm_subnet.aks-default.id

    node_labels = {
      role = "aksnodepool"
    }
  }
  identity {
    type = "SystemAssigned"
  }
  tags = {

    Environment = "Production"

  }

  role_based_access_control_enabled = true

}

# Define the Azure Container Registry
resource "azurerm_container_registry" "ACR" {
  name                = "moralramirezjavier"
  resource_group_name = azurerm_resource_group.RG.name
  location            = azurerm_resource_group.RG.location
  sku                 = "Basic"
  admin_enabled       = true
}

# Allow AKS Cluster access to Azure Container Registry 
resource "azurerm_role_assignment" "example" {
  principal_id                     = azurerm_kubernetes_cluster.AKS.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.ACR.id
  skip_service_principal_aad_check = true
}
 

# Define the null_resource for pushing the Docker image to ACR
resource "null_resource" "push_to_acr" {
  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    command = <<-EOT
     az acr login --name ${azurerm_container_registry.ACR.name} --expose-token
     docker tag your-local-image:latest ${azurerm_container_registry.ACR.login_server}//gurus21/frontend:latest
     docker push ${azurerm_container_registry.ACR.login_server}/gurus21/frontend:latest
   EOT
  }
}


 

# Create a V-N
resource "azurerm_virtual_network" "aksvnet" {
  name                = "aks-network"
  location            = var.location
  resource_group_name = var.resource_group_name
  address_space       = ["10.0.0.0/8"]
}

# Create a Subnet for AKS
resource "azurerm_subnet" "aks-default" {
  name                 = "subnet1"
  virtual_network_name = azurerm_virtual_network.aksvnet.name
  resource_group_name  = azurerm_resource_group.RG.name
  address_prefixes     = ["10.240.0.0/16"]
}
