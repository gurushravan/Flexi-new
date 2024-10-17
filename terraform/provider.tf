terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.94.0"
    }
  }
}

provider "azurerm" {
  features {}
  skip_provider_registration = true
  # Add your subscription ID here
#   subscription_id = "7bd4e787-d2be-4422-a81b-5f352969c314"
}
