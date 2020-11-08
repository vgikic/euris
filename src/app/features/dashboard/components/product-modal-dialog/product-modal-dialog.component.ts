import Product from 'src/app/core/models/product';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EurisApiService } from 'src/app/core/services/euris-api.service';
import { FormsHelpersService } from 'src/app/core/services/forms-helpers.service';
import { ErrorStateMatcherOptionalDirtyExtension } from 'src/app/core/helpers/error-state-matcher';

@Component({
  selector: 'euris-product-modal-dialog',
  templateUrl: './product-modal-dialog.component.html',
  styleUrls: ['./product-modal-dialog.component.scss']
})
export class ProductModalDialogComponent implements OnInit {

  public productFormGroup: FormGroup;
  public esm = new ErrorStateMatcherOptionalDirtyExtension();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { onSave: () => void },
    private dialog: MatDialog,
    private fb: FormBuilder,
    private eurisApiService: EurisApiService,
    private formsHelpersService: FormsHelpersService
  ) { }

  ngOnInit(): void {
    this.initializeProductFormGroup();
  }

  public openDialog() {
    const dialogRef = this.dialog.open(ProductModalDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private initializeProductFormGroup() {
    this.productFormGroup = this.fb.group({
      'title': ['', [Validators.required]],
      'category': ['', [Validators.required]],
      'price': ['', [Validators.required, Validators.min(1)]],
      'employee': ['', [Validators.required]],
      'description': ['', [Validators.required]],
    });
  }

  public submit() {
    if (this.productFormGroup.valid) {
      const model: Product = this.productFormGroup.getRawValue();
      this.eurisApiService.createProduct(model).subscribe(response => {
        this.data.onSave();
        this.dialog.closeAll();
      });
    } else {
      this.formsHelpersService.markControlsAsDirty(this.productFormGroup);
    }
  }

}
