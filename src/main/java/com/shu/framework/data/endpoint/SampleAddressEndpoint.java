package com.shu.framework.data.endpoint;

import com.shu.framework.data.entity.SampleAddress;
import com.shu.framework.data.service.SampleAddressService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Endpoint
@AnonymousAllowed
public class SampleAddressEndpoint {

    private final SampleAddressService service;

    @Autowired
    public SampleAddressEndpoint(SampleAddressService service) {
        this.service = service;
    }

    @Nonnull
    public Page<@Nonnull SampleAddress> list(Pageable page) {
        return service.list(page);
    }

    public Optional<SampleAddress> get(@Nonnull UUID id) {
        return service.get(id);
    }

    @Nonnull
    public SampleAddress update(@Nonnull SampleAddress entity) {
        return service.update(entity);
    }

    public void delete(@Nonnull UUID id) {
        service.delete(id);
    }

    public int count() {
        return service.count();
    }

}
